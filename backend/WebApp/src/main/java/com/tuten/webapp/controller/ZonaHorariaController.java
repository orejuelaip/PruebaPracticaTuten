package com.tuten.webapp.controller;


import com.tuten.webapp.entidad.Base;
import com.tuten.webapp.entidad.ZonaHoraria;
import org.springframework.web.bind.annotation.*;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.*;

@RestController
@RequestMapping("/")
public class ZonaHorariaController {

    private static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";


    @PostMapping
    @RequestMapping("/zonahorarias")
    public static Base<ZonaHoraria> zonaHoraria(@RequestParam(value = "hora") String hora, @RequestParam(value = "timezone") String timezone) throws ParseException {
        Date fecha = new Date();
        Base<ZonaHoraria> base = new Base<ZonaHoraria>();
        ZonaHoraria zone = new ZonaHoraria();
        try {
            String expiryDateString = "2021-03-08T"+hora+"Z";
             SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT, Locale.US);
            formatter.setTimeZone(TimeZone.getTimeZone("UTC"));
            fecha= formatter.parse(expiryDateString);
            zone.setTime(fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds());
            String timeid = TimeZone.getTimeZone("UTC").getID();
            String strtimeid = timeid+"";
            zone.setTimezone(strtimeid);
            base.response=zone;

        } catch (final ParseException e) {
            fecha= null;
        }


        TimeZone timeZone1 = TimeZone.getTimeZone(timezone);
        TimeZone timeZone2 = TimeZone.getTimeZone("UTC");

        Calendar calendar = new GregorianCalendar();
        Calendar calendar2 = new GregorianCalendar();


        calendar.setTimeZone(timeZone1);

        long timeCPH = calendar.getTimeInMillis();
        System.out.println("timeCPH  = " + timeCPH);
        System.out.println("hour     = " + calendar.get(Calendar.HOUR_OF_DAY));

        calendar2.setTimeZone(timeZone2);
        
        long timeLA = calendar2.getTimeInMillis();
        System.out.println("timeLA   = " + timeLA);
        System.out.println("hour     = " + calendar2.get(Calendar.HOUR_OF_DAY));
        return base;
    }
}
