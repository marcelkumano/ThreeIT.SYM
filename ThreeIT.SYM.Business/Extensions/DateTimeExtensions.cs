using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThreeIT.SYM.Business.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime AddWorkingDays(this DateTime dateToAdd,
                                             int workingDaysToAdd)
        {
            int completeWeeks = workingDaysToAdd / 5;
            DateTime date = dateToAdd.AddDays(completeWeeks * 7);
            workingDaysToAdd = workingDaysToAdd % 5;
            for (int i = 0; i < workingDaysToAdd; i++)
            {
                date = date.AddDays(1);
                while (!IsWorkingDay(date))
                {
                    date = date.AddDays(1);
                }
            }
            return date;
        }

        public static bool IsWorkingDay(this DateTime date)
        {
            DayOfWeek day = date.DayOfWeek;
            return day != DayOfWeek.Saturday && day != DayOfWeek.Sunday;
        }

        public static string DayName(this DateTime date)
        {
            return CultureInfo.CurrentCulture.DateTimeFormat.GetDayName(date.DayOfWeek);
        }

        public static string MonthName(this DateTime date)
        {
            return CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(date.Month);
        }

        public static DateTime BrasilNow(this DateTime date) 
        {
            TimeZoneInfo nossaRegiao = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");

            return TimeZoneInfo.ConvertTimeFromUtc(date, nossaRegiao);

        }
    }
}
