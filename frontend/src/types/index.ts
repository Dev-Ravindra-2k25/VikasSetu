export interface CitizenRequest {
  id: number;
  request_uid: string;
  title: string | null;
  description: string;
  raw_text: string | null;
  language: string;
  input_type: string;
  category: string;
  state: string;
  district: string;
  village_town: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  ai_category: string | null;
  ai_problem_summary: string | null;
  ai_sentiment: string | null;
  ai_urgency: string | null;
  ai_confidence: number | null;
  status: string;
  created_at: string;
}

export interface Hotspot {
  id: number;
  title: string;
  category: string;
  state: string;
  district: string;
  cluster_area: string | null;
  latitude: number;
  longitude: number;
  radius_km: number;
  total_complaints: number;
  severity_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  demand_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Recommendation {
  id: number;
  hotspot_id: number | null;
  district: string;
  state: string;
  category: string;
  title: string;
  problem_summary: string;
  recommended_intervention: string;
  priority_score: number;
  priority_status: string;
  citizen_demand_score: number;
  infrastructure_gap_score: number;
  population_impact_score: number;
  demographic_need_score: number;
  investment_deficit_score: number;
  affected_population: number;
  expected_beneficiaries: string;
  estimated_budget_inr: number;
  status: string;
  created_at: string;
}

export interface Project {
  id: number;
  recommendation_id: number | null;
  project_code: string;
  title: string;
  description: string | null;
  category: string;
  department: string;
  district: string;
  state: string;
  sanctioned_budget_inr: number;
  spent_budget_inr: number;
  status: string;
  progress_pct: number;
  start_date: string;
  expected_completion: string | null;
  actual_completion: string | null;
}

export interface ImpactMetric {
  id: number;
  project_id: number | null;
  district: string;
  state: string;
  category: string;
  indicator_name: string;
  before_value: number;
  after_value: number;
  unit: string;
  change_pct: number;
  status: string;
  notes: string | null;
  recorded_at: string;
}

export interface DashboardStats {
  total_citizen_requests: number;
  active_hotspots_count: number;
  critical_hotspots_count: number;
  ai_recommendations_count: number;
  active_projects_count: number;
  total_budget_allocated_inr: number;
  beneficiaries_reached: number;
  average_impact_improvement_pct: number;
  category_breakdown: Record<string, number>;
  top_districts: Array<{ district: string; count: number }>;
  recent_activity: Array<{
    id: string;
    title: string;
    category: string;
    district: string;
    language: string;
    urgency: string;
    time: string;
  }>;
}

export interface AITriageResult {
  detected_language: string;
  category: string;
  problem_summary: string;
  urgency: string;
  sentiment: string;
  confidence: number;
  entities: Record<string, any>;
  recommended_priority_score: number;
}
