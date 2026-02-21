# Apache 403 Log Monitor

Daily digest of blocked requests (HTTP 403) from Apache's access log, emailed via Hostinger SMTP.

---

## Setup

### 1. Configure credentials

```bash
cp scripts/.env.example scripts/.env
```

Edit `scripts/.env` and fill in your real values:

| Variable | Description |
|---|---|
| `LOG_MONITOR_SMTP_HOST` | SMTP server (default: `smtp.hostinger.com`) |
| `LOG_MONITOR_SMTP_PORT` | SMTP port (default: `587`) |
| `LOG_MONITOR_SMTP_USER` | SMTP login / sender address |
| `LOG_MONITOR_SMTP_PASS` | SMTP password |
| `LOG_MONITOR_FROM_EMAIL` | From address (defaults to `SMTP_USER`) |
| `LOG_MONITOR_TO_EMAIL` | Recipient address for the digest |
| `LOG_MONITOR_LOG_PATH` | Path to Apache log (default: `/var/log/httpd/access_log`) |

All variables can also be set as real environment variables — they take precedence over the `.env` file.

---

### 2. Test manually

```bash
python3 scripts/log_monitor.py
```

- Prints `No 403s in the last 24 hours.` and exits 0 if the window is clean.
- Otherwise sends the digest email and prints a confirmation line.

To force output during testing, point at a custom log file:

```bash
LOG_MONITOR_LOG_PATH=/tmp/test_access.log python3 scripts/log_monitor.py
```

---

### 3. Schedule with cron

The log at `/var/log/httpd/access_log` is root-owned by default on Arch Linux,
so the cron job typically needs to run as root (or the log must be made readable
— see the permission note below).

Open the root crontab:

```bash
sudo crontab -e
```

Add this line to run the digest every day at 08:00:

```
0 8 * * * /usr/bin/python3 /path/to/scripts/log_monitor.py >> /var/log/log_monitor.log 2>&1
```

Replace `/path/to/scripts/` with the absolute path to this repository's `scripts/` directory.

Verify the entry was saved:

```bash
sudo crontab -l
```

---

### 4. Log file permissions (Arch Linux)

By default, `/var/log/httpd/access_log` is only readable by root.
Two options if you prefer not to run the script as root:

**Option A — add your user to the `log` group and `chmod` the log:**

```bash
sudo chmod g+r /var/log/httpd/access_log
sudo usermod -aG log $USER
# Re-login or run: newgrp log
```

**Option B — run the cron job as root** (simplest; no permission changes needed):

```bash
sudo crontab -e   # edits root's crontab
```

---

## How it works

1. Reads `LOG_MONITOR_LOG_PATH` line by line.
2. Parses Apache Combined Log Format with a single regex.
3. Collects every `403` entry from the past 24 hours.
4. Groups results by IP and by path (most frequent first).
5. Sends a plain-text digest email via STARTTLS on port 587.
