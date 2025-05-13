"use client";

export type CalendarConfig = {
  showWeekends: boolean;
  startHour: number;
  endHour: number;
};

type Props = {
  config: CalendarConfig;
};

export default function CalendarTool({ config }: Props) {
  const { showWeekends, startHour, endHour } = config;

  const days = showWeekends
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i,
  );

  return (
    <div className="rounded border border-blue-200 bg-blue-50 p-4 shadow-sm overflow-x-auto">
      <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
        🗓️ Calendar Tool
      </h3>

      <ul className="text-sm text-blue-900 space-y-1 mb-4">
        <li>
          <strong>Show Weekends:</strong> {showWeekends ? "Yes" : "No"}
        </li>
        <li>
          <strong>Start Hour:</strong> {startHour}:00
        </li>
        <li>
          <strong>End Hour:</strong> {endHour}:00
        </li>
      </ul>

      <div
        className="grid text-sm"
        style={{ gridTemplateColumns: `100px repeat(${days.length}, 1fr)` }}
      >
        <div className="font-bold text-center text-gray-700">Hour</div>
        {days.map((day) => (
          <div
            key={day}
            className="font-bold text-center text-gray-700 border-l border-gray-300"
          >
            {day}
          </div>
        ))}
        {hours.map((hour) => (
          <>
            <div
              key={`hour-${hour}`}
              className="text-center border-t border-gray-300 py-2 text-gray-600"
            >
              {hour}:00
            </div>
            {days.map((day) => (
              <div
                key={`${day}-${hour}`}
                className="border-t border-l border-gray-200 h-10 bg-white hover:bg-blue-100 transition"
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
