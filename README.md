# VirtualBox Deploy Lab

A small Next.js project for practicing a production deployment to Ubuntu Server running in VirtualBox. The app includes a simple landing page and a `/api/health` endpoint to verify the server is responding.

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Check [http://localhost:3000/api/health](http://localhost:3000/api/health) for the JSON health response.

## Deploy to Ubuntu Server in VirtualBox

This walkthrough uses VirtualBox **NAT port forwarding**. The app listens on port `3000` inside the VM, and VirtualBox forwards the host's port `3000` to it.

### 1. Create the VM

1. Create a VirtualBox VM and install Ubuntu Server 24.04 LTS.
2. In the VM's **Settings → Network → Adapter 1**, choose **NAT**.
3. Open **Advanced → Port Forwarding** and add a rule:

   | Name | Protocol | Host IP | Host Port | Guest IP | Guest Port |
   | --- | --- | --- | --- | --- | --- |
   | Next.js | TCP | (leave blank) | 3000 | (leave blank) | 3000 |

4. Start the VM and sign in. The commands below assume your Ubuntu username is `ubuntu`; replace it with your actual username.

### 2. Install Git and Node.js

On the VM:

```bash
sudo apt update
sudo apt install -y git curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
node --version
npm --version
```

Next.js 16 requires Node.js 20.9 or newer; Node.js 22 is used here.

### 3. Get the project onto the VM

Push this project to a Git remote you control, then replace the placeholder URL:

```bash
git clone <your-repository-url> nextjs-vbox-lab
cd nextjs-vbox-lab
npm ci
```

If you are not using a Git remote yet, copy the project to the VM using a method you are comfortable with, then run `npm ci` in its directory.

### 4. Build and start the production server

```bash
npm run build
npm run start -- --hostname 0.0.0.0
```

Keep this terminal open while testing. From the host machine, visit:

- App: [http://localhost:3000](http://localhost:3000)
- Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

The health endpoint should return JSON similar to:

```json
{
  "status": "ok",
  "app": "nextjs-vbox-lab",
  "timestamp": "..."
}
```

Stop the server with `Ctrl+C`. For this first exercise, the app runs in the foreground; a useful next step is learning to run it persistently with `systemd`, then putting Nginx in front of it with HTTPS.

### Networking notes

- With **NAT**, use the configured host port-forwarding rule and visit `http://localhost:3000` from the host.
- With **Bridged Adapter**, the VM gets an address on your local network; visit `http://<vm-ip>:3000` and allow TCP port 3000 in the VM firewall if needed.
- Avoid exposing this learning server directly to the public internet. Keep it on a trusted network until you have configured a firewall, a reverse proxy, and HTTPS.
