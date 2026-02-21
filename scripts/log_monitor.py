#!/usr/bin/env python3
"""
Apache 403 Log Monitor — Daily Email Digest
Parses Apache access log, summarises 403s from the last 24 hours, and sends
a plain-text digest via Hostinger SMTP.
"""

import os
import re
import sys
import ssl
import smtplib
import socket
from collections import Counter
from datetime import datetime, timedelta, timezone
from email.mime.text import MIMEText
from email.utils import formatdate, make_msgid
from pathlib import Path

UTC = timezone.utc

# Compiled once at module level
LOG_RE = re.compile(
    r'^(\S+)\s+\S+\s+\S+\s+\[([^\]]+)\]\s+"(\S+)\s+(\S+)\s+\S+"\s+(\d{3})'
)
TS_FORMAT = "%d/%b/%Y:%H:%M:%S %z"


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def load_config() -> dict:
    """Load config from scripts/.env, then from real env vars (env wins)."""
    env_file = Path(__file__).parent / ".env"
    if env_file.is_file():
        with env_file.open(errors="replace") as fh:
            for line in fh:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

    # Defaults
    os.environ.setdefault("LOG_MONITOR_SMTP_HOST", "smtp.hostinger.com")
    os.environ.setdefault("LOG_MONITOR_SMTP_PORT", "587")
    os.environ.setdefault(
        "LOG_MONITOR_FROM_EMAIL",
        os.environ.get("LOG_MONITOR_SMTP_USER", ""),
    )
    os.environ.setdefault("LOG_MONITOR_LOG_PATH", "/var/log/httpd/access_log")

    required = [
        "LOG_MONITOR_SMTP_USER",
        "LOG_MONITOR_SMTP_PASS",
        "LOG_MONITOR_TO_EMAIL",
    ]
    for key in required:
        if not os.environ.get(key):
            print(f"Error: required env var {key!r} is not set.", file=sys.stderr)
            sys.exit(1)

    return {
        "SMTP_HOST":   os.environ["LOG_MONITOR_SMTP_HOST"],
        "SMTP_PORT":   int(os.environ["LOG_MONITOR_SMTP_PORT"]),
        "SMTP_USER":   os.environ["LOG_MONITOR_SMTP_USER"],
        "SMTP_PASS":   os.environ["LOG_MONITOR_SMTP_PASS"],
        "FROM_EMAIL":  os.environ["LOG_MONITOR_FROM_EMAIL"],
        "TO_EMAIL":    os.environ["LOG_MONITOR_TO_EMAIL"],
        "LOG_PATH":    os.environ["LOG_MONITOR_LOG_PATH"],
    }


# ---------------------------------------------------------------------------
# Log parsing
# ---------------------------------------------------------------------------

def parse_log(log_path: str, cutoff: datetime) -> list[tuple[str, str]]:
    """Return list of (ip, path) for every 403 entry at or after *cutoff*."""
    path = Path(log_path)
    try:
        fh = path.open(errors="replace")
    except FileNotFoundError:
        print(f"Error: log file not found: {log_path}", file=sys.stderr)
        sys.exit(1)
    except PermissionError:
        print(f"Error: permission denied reading: {log_path}", file=sys.stderr)
        sys.exit(1)

    entries: list[tuple[str, str]] = []
    with fh:
        for line in fh:
            m = LOG_RE.match(line)
            if not m:
                continue
            ip, ts_raw, _method, req_path, status = m.groups()
            if status != "403":
                continue
            try:
                ts = datetime.strptime(ts_raw, TS_FORMAT)
            except ValueError:
                continue
            if ts >= cutoff:
                entries.append((ip, req_path))

    return entries


# ---------------------------------------------------------------------------
# Formatting
# ---------------------------------------------------------------------------

def format_digest(entries: list[tuple[str, str]], cutoff: datetime) -> str:
    """Return a plain-text digest of 403 activity."""
    now = datetime.now(UTC)
    period = (
        f"{cutoff.strftime('%Y-%m-%d %H:%M')} UTC  →  "
        f"{now.strftime('%Y-%m-%d %H:%M')} UTC"
    )

    ips    = Counter(ip   for ip, _    in entries)
    paths  = Counter(path for _,  path in entries)

    lines = [
        "Sababa Nights — Apache 403 Digest",
        "=" * 50,
        f"Period : {period}",
        f"Total  : {len(entries)} blocked request(s)",
        "",
        "By IP (top offenders)",
        "-" * 30,
    ]
    for ip, count in ips.most_common():
        lines.append(f"  {count:>5}x  {ip}")

    lines += [
        "",
        "By Path (most targeted)",
        "-" * 30,
    ]
    for req_path, count in paths.most_common():
        lines.append(f"  {count:>5}x  {req_path}")

    lines += ["", "-- end of digest --"]
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Email
# ---------------------------------------------------------------------------

def send_email(config: dict, subject: str, body: str) -> None:
    """Send *body* via Hostinger SMTP using STARTTLS."""
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"]    = subject
    msg["From"]       = config["FROM_EMAIL"]
    msg["To"]         = config["TO_EMAIL"]
    msg["Date"]       = formatdate(localtime=False)
    msg["Message-ID"] = make_msgid(domain=config["FROM_EMAIL"].split("@")[-1])

    try:
        with smtplib.SMTP(config["SMTP_HOST"], config["SMTP_PORT"], timeout=30) as smtp:
            smtp.ehlo()
            smtp.starttls(context=ssl.create_default_context())
            smtp.ehlo()
            smtp.login(config["SMTP_USER"], config["SMTP_PASS"])
            smtp.sendmail(config["FROM_EMAIL"], [config["TO_EMAIL"]], msg.as_string())
    except smtplib.SMTPAuthenticationError as exc:
        print(f"SMTP authentication failed: {exc}", file=sys.stderr)
        sys.exit(1)
    except smtplib.SMTPException as exc:
        print(f"SMTP error: {exc}", file=sys.stderr)
        sys.exit(1)
    except OSError as exc:
        print(f"Network error connecting to SMTP server: {exc}", file=sys.stderr)
        sys.exit(1)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    config  = load_config()
    cutoff  = datetime.now(UTC) - timedelta(hours=24)
    entries = parse_log(config["LOG_PATH"], cutoff)

    if not entries:
        print("No 403s in the last 24 hours.")
        sys.exit(0)

    date    = datetime.now(UTC).strftime("%Y-%m-%d")
    subject = f"[Sababa Nights] 403 Digest — {date} ({len(entries)} blocked)"
    body    = format_digest(entries, cutoff)

    send_email(config, subject, body)
    print(f"Digest sent: {len(entries)} 403(s) — {subject}")


if __name__ == "__main__":
    main()
