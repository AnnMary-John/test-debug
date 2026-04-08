# Project Bugs & Issues

This document tracks intentional bugs and issues introduced for debugging exercises.

## 🔴 Critical Issues

### 1. Cross-Portal Authentication Bypass
**Problem**: Both `platform_user` and `vendor` user types can log in to both the Ops Portal and the Vendor Portal.
**Expected Behavior**: 
- Ops Portal should only be accessible by `platform_user`.
- Vendor Portal should only be accessible by `vendor`.


### 2. Dashboard Staleness (Ops View)
**Problem**: The vendor table in the Ops Portal does not automatically update when a new vendor is successfully added.
**Expected Behavior**: The list should refetch or the state should be updated immediately after a new vendor is created.


### 3. Missing Drivers (Vendor Portal)
**Problem**: Drivers are not appearing in the Drivers list even though they exist in the database.
**Expected Behavior**: All drivers belonging to the logged-in vendor should be visible.
