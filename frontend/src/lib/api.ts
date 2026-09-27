import {
  CitizenRequest,
  Hotspot,
  Recommendation,
  Project,
  ImpactMetric,
  DashboardStats,
  AITriageResult,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return await res.json();
  } catch (error) {
    console.warn("API offline or error, returning fallback stats:", error);
    return {
      total_citizen_requests: 28420,
      active_hotspots_count: 14,
      critical_hotspots_count: 6,
      ai_recommendations_count: 12,
      active_projects_count: 8,
      total_budget_allocated_inr: 245000000,
      beneficiaries_reached: 485000,
      average_impact_improvement_pct: 34.2,
      category_breakdown: {
        "Roads & Transport": 8420,
        "Water & Sanitation": 6210,
        "Healthcare": 3810,
        "Education": 2940,
        "Electricity": 2150,
        "Internet & Digital Connectivity": 1890,
      },
      top_districts: [
        { district: "Basti", count: 8420 },
        { district: "Gorakhpur", count: 6210 },
        { district: "Varanasi", count: 4500 },
        { district: "Sambhal", count: 3100 },
        { district: "Sitapur", count: 2700 },
      ],
      recent_activity: [
        {
          id: "VS-BST-8421",
          title: "Roads & Transport Issue in Basti",
          category: "Roads & Transport",
          district: "Basti",
          language: "hi",
          urgency: "HIGH",
          time: "Just now",
        },
        {
          id: "VS-BST-3810",
          title: "Healthcare Crisis in Kaptanganj",
          category: "Healthcare",
          district: "Basti",
          language: "hi",
          urgency: "CRITICAL",
          time: "12m ago",
        },
        {
          id: "VS-GKP-6210",
          title: "Drinking water pipeline contamination",
          category: "Water & Sanitation",
          district: "Gorakhpur",
          language: "hi",
          urgency: "CRITICAL",
          time: "45m ago",
        },
      ],
    };
  }
}

export async function fetchHotspots(category?: string, severity?: string): Promise<Hotspot[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (severity) params.append("severity", severity);

    const res = await fetch(`${API_BASE_URL}/hotspots?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch hotspots");
    return await res.json();
  } catch (error) {
    console.warn("Returning fallback hotspots:", error);
    return [
      {
        id: 1,
        title: "Basti Road Infrastructure Demand Hotspot",
        category: "Roads & Transport",
        state: "Uttar Pradesh",
        district: "Basti",
        cluster_area: "Harraiya, Vikramjot & Basti Rural Corridor",
        latitude: 26.7997,
        longitude: 82.8021,
        radius_km: 12.0,
        total_complaints: 8420,
        severity_level: "CRITICAL",
        demand_score: 94.5,
        status: "ACTIVE",
        created_at: "2026-09-01T00:00:00Z",
        updated_at: "2026-09-16T12:00:00Z",
      },
      {
        id: 2,
        title: "Basti Healthcare Access Demand Hotspot",
        category: "Healthcare",
        state: "Uttar Pradesh",
        district: "Basti",
        cluster_area: "Kaptanganj & Saltaua Gopalpur",
        latitude: 26.8350,
        longitude: 82.7650,
        radius_km: 10.0,
        total_complaints: 3810,
        severity_level: "CRITICAL",
        demand_score: 92.0,
        status: "ACTIVE",
        created_at: "2026-09-02T00:00:00Z",
        updated_at: "2026-09-16T12:00:00Z",
      },
      {
        id: 3,
        title: "Gorakhpur Water & Sanitation Hotspot",
        category: "Water & Sanitation",
        state: "Uttar Pradesh",
        district: "Gorakhpur",
        cluster_area: "Bansgaon & Campierganj Lowlands",
        latitude: 26.7606,
        longitude: 83.3732,
        radius_km: 14.0,
        total_complaints: 6210,
        severity_level: "CRITICAL",
        demand_score: 89.0,
        status: "ACTIVE",
        created_at: "2026-09-03T00:00:00Z",
        updated_at: "2026-09-16T12:00:00Z",
      },
      {
        id: 4,
        title: "Varanasi School Infrastructure Deficit",
        category: "Education",
        state: "Uttar Pradesh",
        district: "Varanasi",
        cluster_area: "Cholapur & Pindra Composite Blocks",
        latitude: 25.3176,
        longitude: 82.9739,
        radius_km: 8.5,
        total_complaints: 2940,
        severity_level: "HIGH",
        demand_score: 76.5,
        status: "ACTIVE",
        created_at: "2026-09-04T00:00:00Z",
        updated_at: "2026-09-16T12:00:00Z",
      },
      {
        id: 5,
        title: "Sitapur Power Grid Outage Hotspot",
        category: "Electricity",
        state: "Uttar Pradesh",
        district: "Sitapur",
        cluster_area: "Maholi & Biswan Agricultural Belt",
        latitude: 27.5683,
        longitude: 80.6829,
        radius_km: 9.0,
        total_complaints: 2150,
        severity_level: "HIGH",
        demand_score: 78.0,
        status: "ACTIVE",
        created_at: "2026-09-05T00:00:00Z",
        updated_at: "2026-09-16T12:00:00Z",
      },
    ];
  }
}

export async function fetchRecommendations(status?: string): Promise<Recommendation[]> {
  try {
    const url = status
      ? `${API_BASE_URL}/recommendations?status=${encodeURIComponent(status)}`
      : `${API_BASE_URL}/recommendations`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch recommendations");
    return await res.json();
  } catch (error) {
    console.warn("Returning fallback recommendations:", error);
    return [
      {
        id: 1,
        hotspot_id: 2,
        district: "Basti",
        state: "Uttar Pradesh",
        category: "Healthcare",
        title: "Upgrade Kaptanganj Primary Health Centre to 50-Bed Community Health Centre",
        problem_summary:
          "Insufficient healthcare infrastructure (only 2 functional hospitals for 2,40,000 citizens with 15 km average travel distance and 3,810 verified complaints).",
        recommended_intervention:
          "Develop/upgrade community healthcare infrastructure with 24x7 emergency ward, neonatal care unit, and digital tele-consultation hub.",
        priority_score: 92.0,
        priority_status: "CRITICAL PRIORITY",
        citizen_demand_score: 33.5,
        infrastructure_gap_score: 23.5,
        population_impact_score: 17.5,
        demographic_need_score: 8.5,
        investment_deficit_score: 9.0,
        affected_population: 180000,
        expected_beneficiaries: "High (~1.8 lakh rural residents across 42 gram panchayats)",
        estimated_budget_inr: 32000000.0,
        status: "SANCTIONED",
        created_at: "2026-09-10T00:00:00Z",
      },
      {
        id: 2,
        hotspot_id: 1,
        district: "Basti",
        state: "Uttar Pradesh",
        category: "Roads & Transport",
        title: "Construct All-Weather Pucca Corridor for Harraiya-Vikramjot Agricultural Link",
        problem_summary:
          "Heavy citizen demand (8,420 complaints) indicating impassable unpaved arterial road that isolates 60+ villages during July-October rains.",
        recommended_intervention:
          "Upgrade/repair the identified rural road corridor: 18.4 km widening, asphalt concreting, and 4 reinforced box culverts.",
        priority_score: 91.0,
        priority_status: "CRITICAL PRIORITY",
        citizen_demand_score: 34.5,
        infrastructure_gap_score: 21.5,
        population_impact_score: 18.0,
        demographic_need_score: 8.5,
        investment_deficit_score: 8.5,
        affected_population: 210000,
        expected_beneficiaries: "High (~2.1 lakh villagers and farmers)",
        estimated_budget_inr: 48000000.0,
        status: "PROPOSED",
        created_at: "2026-09-11T00:00:00Z",
      },
      {
        id: 3,
        hotspot_id: 3,
        district: "Gorakhpur",
        state: "Uttar Pradesh",
        category: "Water & Sanitation",
        title: "Deploy Piped Drinking Water & Overhead Chlorination Reservoirs",
        problem_summary:
          "High concentration of waterborne disease complaints (6,210 requests) with groundwater contamination and broken handpumps.",
        recommended_intervention:
          "Install 3 solar-powered multi-village piped water schemes with filtration and doorstep tap connections under Jal Jeevan Mission.",
        priority_score: 89.0,
        priority_status: "CRITICAL PRIORITY",
        citizen_demand_score: 32.0,
        infrastructure_gap_score: 23.0,
        population_impact_score: 17.0,
        demographic_need_score: 8.0,
        investment_deficit_score: 9.0,
        affected_population: 195000,
        expected_beneficiaries: "High (~1.95 lakh citizens)",
        estimated_budget_inr: 28000000.0,
        status: "SANCTIONED",
        created_at: "2026-09-12T00:00:00Z",
      },
    ];
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (error) {
    console.warn("Returning fallback projects:", error);
    return [
      {
        id: 1,
        recommendation_id: 1,
        project_code: "PRJ-BST-MED-2026",
        title: "Basti CHC Infrastructure Expansion & Trauma Ward",
        description: "Civil construction and equipment procurement for 50-bed modern medical facility in Kaptanganj.",
        category: "Healthcare",
        department: "Department of Health & Family Welfare",
        district: "Basti",
        state: "Uttar Pradesh",
        sanctioned_budget_inr: 32000000.0,
        spent_budget_inr: 21000000.0,
        status: "IN_PROGRESS",
        progress_pct: 68.0,
        start_date: "2026-05-15T00:00:00Z",
        expected_completion: "2026-11-15T00:00:00Z",
        actual_completion: null,
      },
      {
        id: 2,
        recommendation_id: 3,
        project_code: "PRJ-GKP-JJM-2026",
        title: "Gorakhpur Piped Water Supply Network Stage 1",
        description: "Installation of 3 water overhead storage reservoirs and 42km distribution pipeline in Bansgaon.",
        category: "Water & Sanitation",
        department: "State Jal Nigam / Jal Shakti",
        district: "Gorakhpur",
        state: "Uttar Pradesh",
        sanctioned_budget_inr: 28000000.0,
        spent_budget_inr: 25500000.0,
        status: "IN_PROGRESS",
        progress_pct: 85.0,
        start_date: "2026-03-20T00:00:00Z",
        expected_completion: "2026-10-20T00:00:00Z",
        actual_completion: null,
      },
    ];
  }
}

export async function fetchImpactMetrics(): Promise<ImpactMetric[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/impact`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch impact");
    return await res.json();
  } catch (error) {
    console.warn("Returning fallback impact metrics:", error);
    return [
      {
        id: 1,
        project_id: 1,
        district: "Basti",
        state: "Uttar Pradesh",
        category: "Healthcare",
        indicator_name: "Healthcare Accessibility Index",
        before_value: 42.0,
        after_value: 71.0,
        unit: "%",
        change_pct: 69.0,
        status: "MEASURED",
        notes: "Access jumped from 42% to 71% following operationalization of maternal & emergency wing",
        recorded_at: "2026-09-10T00:00:00Z",
      },
      {
        id: 2,
        project_id: 1,
        district: "Basti",
        state: "Uttar Pradesh",
        category: "Healthcare",
        indicator_name: "Average Healthcare Travel Distance",
        before_value: 18.0,
        after_value: 9.0,
        unit: "km",
        change_pct: -50.0,
        status: "MEASURED",
        notes: "Emergency commute distance halved from 18 km to 9 km for 42 surrounding villages",
        recorded_at: "2026-09-10T00:00:00Z",
      },
      {
        id: 3,
        project_id: 1,
        district: "Basti",
        state: "Uttar Pradesh",
        category: "Healthcare",
        indicator_name: "Citizen Complaints Volume",
        before_value: 8420.0,
        after_value: 2180.0,
        unit: "complaints",
        change_pct: -74.1,
        status: "MEASURED",
        notes: "Citizen grievances dropped 74% within 60 days of initial service rollout",
        recorded_at: "2026-09-10T00:00:00Z",
      },
    ];
  }
}

export async function submitCitizenRequest(data: any): Promise<CitizenRequest> {
  const res = await fetch(`${API_BASE_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit citizen request");
  return await res.json();
}

export async function previewAITriage(text: string, district = "Basti", category?: string): Promise<AITriageResult> {
  const params = new URLSearchParams({ text, district });
  if (category) params.append("category", category);
  const res = await fetch(`${API_BASE_URL}/requests/triage-preview?${params.toString()}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to preview triage");
  return await res.json();
}

export async function sanctionRecommendation(id: number, department: string, budget?: number): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/recommendations/${id}/sanction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ department, sanctioned_budget_inr: budget }),
  });
  if (!res.ok) throw new Error("Failed to sanction recommendation");
  return await res.json();
}
