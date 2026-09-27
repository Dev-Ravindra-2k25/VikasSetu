import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

interface PriorityScoreBadgeProps {
  score: number;
  status: string;
  demand?: number;
  gap?: number;
  population?: number;
  demographic?: number;
  investment?: number;
  showBreakdown?: boolean;
}

export function PriorityScoreBadge({
  score,
  status,
  demand = 33.5,
  gap = 23.5,
  population = 17.5,
  demographic = 8.5,
  investment = 9.0,
  showBreakdown = false,
}: PriorityScoreBadgeProps) {
  const isCritical = score >= 85;
  const isHigh = score >= 70 && score < 85;

  const badgeColor = isCritical
    ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
    : isHigh
    ? "border-orange-500/50 bg-orange-500/10 text-orange-400"
    : "border-amber-500/50 bg-amber-500/10 text-amber-400";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {/* Circular score dial */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-civic-border bg-slate-900 shadow-inner">
          <span className={`text-lg font-black ${isCritical ? "text-rose-400" : isHigh ? "text-orange-400" : "text-amber-400"}`}>
            {score.toFixed(0)}
          </span>
          <span className="absolute -bottom-1 text-[9px] font-bold text-slate-400">/100</span>
        </div>

        <div>
          <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${badgeColor}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping"></span>
            {status}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            AI-assisted explainable prioritization score
          </p>
        </div>
      </div>

      {showBreakdown && (
        <div className="space-y-2 rounded-lg border border-civic-border/70 bg-slate-950/60 p-3 text-xs">
          <div className="flex justify-between font-medium text-slate-300 pb-1 border-b border-civic-border/50">
            <span>Score Composition</span>
            <span className="text-amber-400 font-bold">{score.toFixed(1)} / 100</span>
          </div>

          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                <span>Citizen Demand (Max 35%)</span>
                <span className="text-slate-200 font-medium">{demand.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 rounded-full bg-amber-500" style={{ width: `${(demand / 35) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                <span>Infrastructure Gap (Max 25%)</span>
                <span className="text-slate-200 font-medium">{gap.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 rounded-full bg-rose-500" style={{ width: `${(gap / 25) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                <span>Population Impact (Max 20%)</span>
                <span className="text-slate-200 font-medium">{population.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${(population / 20) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                <span>Demographic Need (Max 10%)</span>
                <span className="text-slate-200 font-medium">{demographic.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${(demographic / 10) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                <span>Investment Deficit (Max 10%)</span>
                <span className="text-slate-200 font-medium">{investment.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 rounded-full bg-purple-500" style={{ width: `${(investment / 10) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
