#ifndef HOLIDAY_MANAGER_H
#define HOLIDAY_MANAGER_H

#include <vector>
#include <string>

struct HolidayEvent {
    std::string name;
    std::string type;
    std::string date;
    std::vector<std::string> traditions;
};

class HolidayManager {
private:
    std::vector<HolidayEvent> activeHolidays;

public:
    HolidayManager();
    std::vector<HolidayEvent> getActiveHolidays();
    void updateHolidays();
};

#endif
