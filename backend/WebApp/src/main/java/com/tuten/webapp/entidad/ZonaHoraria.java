package com.tuten.webapp.entidad;

public class ZonaHoraria {


    private String time ;
    private String timezone ;

    public ZonaHoraria(String time, String timezone) {
        this.time = time;
        this.timezone = timezone;
    }
    public ZonaHoraria() {

    }
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }
}
