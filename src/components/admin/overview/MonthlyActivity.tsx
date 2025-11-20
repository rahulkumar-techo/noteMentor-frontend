import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function MonthlyActivity() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <Card className="rounded-2xl p-4 w-full">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-base sm:text-lg">
                    Monthly Activity
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                
                {/* Chart Wrapper (scrollable on extra-small screens) */}
                <div className="w-full overflow-x-auto scrollbar-none">
                    <div className="min-w-[600px] sm:min-w-0 h-40 sm:h-48 md:h-56 
                                    rounded-lg bg-gradient-to-r from-slate-50 to-white 
                                    shadow-inner flex items-end gap-2 p-4">
                        
                        {months.map((m, i) => {
                            const height = Math.max(6, Math.round(Math.sin(i + 1) * 40 + 50));

                            return (
                                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                                    <div className="w-full flex items-end h-[80px] sm:h-[100px] md:h-[120px]">
                                        <motion.div
                                            className="w-full rounded-xl"
                                            style={{ height: `${height}%` }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.4 + i * 0.02 }}
                                        >
                                            <div className="h-full w-full bg-gradient-to-t 
                                                            from-indigo-500 via-indigo-400 to-indigo-300 
                                                            rounded-xl" 
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Month Label */}
                                    <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                                        {m}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
