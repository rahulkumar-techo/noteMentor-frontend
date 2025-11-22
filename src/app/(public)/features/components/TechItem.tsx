// description: Small card item displaying one technology with icon + description

export default function TechItem({ tech }: any) {
  return (
    <div className="flex items-start gap-4 p-4 border border-black/10 dark:border-white/10 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition">
      
      <div className=" bg-white rounded-full">
        <img 
        src={tech.icon}
        alt={tech.name}
        className="w-8 h-8 opacity-80"
        onLoad={(err)=>err.timeStamp}
      />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-black dark:text-white">
          {tech.name}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
          {tech.description}
        </p>
      </div>
    </div>
  );
}
