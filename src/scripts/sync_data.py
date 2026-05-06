import subprocess
import sys
from pathlib import Path

def run_script(script_name):
    print(f"\n--- Running {script_name} ---")
    # Using subprocess.run to execute the scripts and pass through output
    result = subprocess.run([sys.executable, script_name], capture_output=False)
    if result.returncode != 0:
        print(f"!!! Error: {script_name} failed with exit code {result.returncode} !!!")
        return False
    return True

if __name__ == "__main__":
    print("====================================================")
    print("   MH Wilds Build Crafter - Data Sync Pipeline      ")
    print("====================================================")
    
    scripts = [
        "db_manager.py",   # Initialize schema
        "weapons.py",      # Fetch & Ingest Weapons
        "fetch.py",        # Fetch & Ingest Armor, Sets, Skills, Decos
        "export_data.py"   # Export optimized JSON for frontend
    ]
    
    success = True
    for script in scripts:
        script_path = Path(__file__).parent / script
        if not script_path.exists():
            print(f"❌ Script not found: {script_path}")
            success = False
            break
        if not run_script(str(script_path)):
            success = False
            break
            
    if success:
        print("\n====================================================")
        print("✅ Success: Database and Frontend are now in sync!")
        print("====================================================")
    else:
        print("\n====================================================")
        print("❌ Sync Failed. Check the errors above.")
        print("====================================================")
        sys.exit(1)
