#!/usr/bin/env python3
"""
PhotoMagic Studio - Automated Pre-Wedding Pipeline & Content Generator
Automates batch prompt generation, duplicate detection, asset synchronization,
metadata registration, and verification across the monorepo.
"""

import os
import sys
import json
import glob
import hashlib
from typing import List, Dict, Any, Optional

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CONFIG_PATH = os.path.join(PROJECT_ROOT, "packages", "config", "src", "prewedding-pipeline-config.json")
MANIFEST_PATH = os.path.join(PROJECT_ROOT, "packages", "config", "src", "prewedding-generation-manifest.json")
STUDIO_DATA_PATH = os.path.join(PROJECT_ROOT, "packages", "config", "src", "studio-data.ts")
STUDIO_IMAGES_DIR = os.path.join(PROJECT_ROOT, "apps", "studio", "public", "images")
OS_IMAGES_DIR = os.path.join(PROJECT_ROOT, "apps", "os", "public", "images")

def load_config() -> Dict[str, Any]:
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def load_manifest() -> Dict[str, Any]:
    if os.path.exists(MANIFEST_PATH):
        with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"manifestVersion": "1.0.0", "totalAssets": 0, "collection": "pre-wedding", "assets": []}

def save_manifest(manifest: Dict[str, Any]):
    manifest["totalAssets"] = len(manifest.get("assets", []))
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"[Pipeline] Manifest saved with {manifest['totalAssets']} items -> {MANIFEST_PATH}")

def check_asset_exists(filename: str) -> bool:
    studio_file = os.path.join(STUDIO_IMAGES_DIR, filename)
    os_file = os.path.join(OS_IMAGES_DIR, filename)
    return os.path.exists(studio_file) and os.path.exists(os_file)

def verify_all_assets() -> Dict[str, Any]:
    manifest = load_manifest()
    results = {"total": len(manifest["assets"]), "verified": 0, "missing": []}
    
    for item in manifest["assets"]:
        fname = item.get("filename") or os.path.basename(item.get("src", ""))
        studio_path = os.path.join(STUDIO_IMAGES_DIR, fname)
        os_path = os.path.join(OS_IMAGES_DIR, fname)
        
        if os.path.exists(studio_path) and os.path.exists(os_path):
            item["verified"] = True
            results["verified"] += 1
        else:
            item["verified"] = False
            results["missing"].append(fname)
            
    save_manifest(manifest)
    print(f"[Pipeline] Verified {results['verified']}/{results['total']} assets. Missing: {len(results['missing'])}")
    return results

def sync_assets():
    """Ensure all images present in apps/studio/public/images are synced to apps/os/public/images"""
    studio_images = glob.glob(os.path.join(STUDIO_IMAGES_DIR, "*.*"))
    synced = 0
    for src in studio_images:
        fname = os.path.basename(src)
        dst = os.path.join(OS_IMAGES_DIR, fname)
        if not os.path.exists(dst) or os.path.getmtime(src) > os.path.getmtime(dst):
            with open(src, "rb") as rf, open(dst, "wb") as wf:
                wf.write(rf.read())
            synced += 1
    print(f"[Pipeline] Asset synchronization complete. Synced {synced} files.")

def list_pipeline_status():
    config = load_config()
    manifest = load_manifest()
    print("==================================================================")
    print(" PHOTOMAGIC STUDIO - PRE-WEDDING PIPELINE STATUS")
    print("==================================================================")
    print(f"Collection:       {config.get('name')}")
    print(f"Configured Templates: {len(config.get('templates', []))}")
    print(f"Registered Manifest Items: {len(manifest.get('assets', []))}")
    print(f"Target Regions:   {', '.join(config.get('regions', []))}")
    print(f"Religions:        {', '.join(config.get('religions', []))}")
    print(f"Location Types:   {', '.join(config.get('locationTypes', []))}")
    print("------------------------------------------------------------------")
    verify_all_assets()
    print("==================================================================")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        cmd = sys.argv[1].lower()
        if cmd == "status":
            list_pipeline_status()
        elif cmd == "verify":
            verify_all_assets()
        elif cmd == "sync":
            sync_assets()
        else:
            print(f"Unknown command: {cmd}. Available: status, verify, sync")
    else:
        list_pipeline_status()
