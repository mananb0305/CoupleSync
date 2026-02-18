# Twodo Dev Start Script

# 1. Setup Environment Variables
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
$env:ANDROID_HOME = "C:\Users\manan\AppData\Local\Android\Sdk"
$env:Path = "C:\Program Files\nodejs;" + $env:Path + ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator"

Write-Host "Environment Configured."
Write-Host "JAVA_HOME: $env:JAVA_HOME"
Write-Host "ANDROID_HOME: $env:ANDROID_HOME"

# 2. Start Backend (in new window)
Write-Host "Starting Backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start:dev"

# 3. Start Android Emulator (detached)
Write-Host "Launching Emulator..."
Start-Process -FilePath "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd Medium_Phone_API_36.1" -WindowStyle Minimized

# 4. Wait for Emulator to boot (simple sleep for now, or user can wait)
Write-Host "Waiting 20s for Emulator to warm up..."
Start-Sleep -Seconds 20

# 5. Start Metro Bundler (in new window)
Write-Host "Starting Metro Bundler..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npx react-native start"

# 6. Run Android App
Write-Host "Building and Running Android App..."
Set-Location frontend
npx react-native run-android

Write-Host "Done! App should launch on emulator."
Read-Host "Press Enter to exit this launcher (Terminal windows will stay open)..."
