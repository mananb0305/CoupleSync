---
trigger: always_on
---

Always create and activate a virtual environment named "venv" before installing or running anything.

Install all dependencies inside the venv only. Never use global installs.

If requirements.txt exists, install from it. Otherwise infer dependencies and generate requirements.txt 

 Ensure reproducible setup and safe execution