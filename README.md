# Agrionics Co. // Commercial Storefront

[![Website Live](https://img.shields.io/badge/Live-Website-00a896?style=for-the-badge)](https://sincerelystepper.github.io/agrionicsco)

This repository contains the public-facing presentation layer and service catalog for **Agrionics Co.**, an engineering consulting firm specializing in high-density embedded systems design, reconfigurable computing (FPGA), and low-power RF telemetry.

## ⚠️ Architecture Boundary: Where is the RTL?

**This repository only hosts the static frontend files for the website.** If you are an engineering lead or recruiter looking for synthesizable SystemVerilog, bare-metal C/C++ firmware stacks, or multi-layer KiCad PCB routing files, please refer to the specific project repositories on this GitHub profile. 

Key IP Core repositories include:
* **AES-CORE:** Ultra-Low-Power PDM-to-PCM Acoustic DSP Engine
* **L2S-REG:** Lattice iCE40 to STM32 SPI Register Controller
* **FA-RSS:** Frequency-Agile Low-IF RF Signal Synthesizer
* **AGR-CR-FFT:** Cognitive Radio Listener (Licensed under GNU Lesser General Public License v2.1)

To license commercial IP cores or request a prototyping quote, please initiate contact via the [Agrionics Co. Portal](https://sincerelystepper.github.io/agrionicsco/contact.html).

---

## 🛠️ Web Tech Stack

To maintain an ultra-low footprint and avoid frontend framework bloat, this site is built strictly with:
* **Structure:** Semantic HTML5
* **Styling:** Tailwind CSS (via CDN) for utility-class styling and dark-mode toggling.
* **Interactivity:** Vanilla JavaScript (Zero external dependencies).
* **Hosting & CI/CD:** GitHub Pages.

## 🚀 Deployment Operations

This site utilizes flat architecture. Deployment is fully automated via GitHub Pages.

