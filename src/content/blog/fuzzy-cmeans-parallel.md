---
title: Optimizing Fuzzy C-Means with Parallel Processing
date: 2024-02-10
category: research
summary: How I achieved a 40% performance improvement in a clustering algorithm by identifying the right bottleneck — not the one I expected.
tags:
  - C++
  - Fuzzy Logic
  - Multithreading
  - Performance
---

// Background
Fuzzy C-Means (FCM) is a soft-clustering algorithm where each data point
belongs to every cluster with a membership degree in [0,1]. It's the
foundation of my AI Stylometry research.

// The Problem
The naive implementation of FCM has two nested O(n*k) loops per iteration:
one to compute distances, one to update centroids. For our dataset (n=10,000
samples, k=8 clusters, 150+ iterations), this was 12 seconds per run.
Way too slow for research iteration.

// What I tried first (wrong approach)
My first instinct was to parallelize the centroid update loop. It's the
"obvious" bottleneck — lots of floating-point accumulation. But after
profiling with gprof, I discovered the centroid update was only ~15% of
runtime. The membership matrix recomputation was 70%.

// The actual fix
The membership update for each point is independent. `std::for_each` with
`std::execution::par_unseq` dropped that step from 8.4s to 5.0s. Then I
moved the inner distance computations to use SIMD-friendly data layouts:
AoS → SoA (Array of Structures → Structure of Arrays). This alone gave
another 1.5s reduction.

// Result
Total: 12s → 7.2s → ~5.0s (final with both changes) = 58% improvement.
The paper reported 40% because we compared against a fair single-threaded
baseline, not the naive version. Always profile before you parallelize.
