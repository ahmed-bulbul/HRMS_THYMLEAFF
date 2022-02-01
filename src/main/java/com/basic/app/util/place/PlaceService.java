package com.basic.app.util.place;

import com.basic.app.acl.auth.domain.User;
import org.springframework.stereotype.Service;

import java.util.*;

// https://beginnersbook.com/2013/12/how-to-sort-hashmap-in-java-by-keys-and-values/
// https://stackoverflow.com/questions/8119366/sorting-hashmap-by-values

@Service
public class PlaceService {


   // UserLocationRepository userLocationRepository;

    public PlaceService(){
    }
//    public PlaceService(UserLocationRepository userLocationRepository){
//        this.userLocationRepository = userLocationRepository;
//    }


//    public List<UserLocation> getAllTechnicianLocations(){
//        List<UserLocation> userLocations;
//        userLocations = this.userLocationRepository.loadUsersLocation2("Technician");
//        return userLocations;
//    }


    public static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;

        } else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515;
            if (unit.equals("K")) {
                dist = dist * 1.609344;
            } else if (unit.equals("N")) {
                dist = dist * 0.8684;
            }
            return (dist);
        }
    }


    public LinkedHashMap<User, Double> getNearestPeoples(Double clientLat, Double clientLon, Integer numOfPeople){

        LinkedHashMap<User, Double> nearestPeoplesMap = new LinkedHashMap<>();
        if(clientLat == null) return nearestPeoplesMap;
        if(clientLon == null) return nearestPeoplesMap;

        if(numOfPeople == null) numOfPeople = 10;
        Map<User, Double> peopleDistMap = new HashMap<>();

//        List<UserLocation> userLocations = this.getAllTechnicianLocations();
//        for (UserLocation userLocation : userLocations) {
//            User user = userLocation.getUser();
//            Double techLat = userLocation.getLatitude();
//            Double techLon = userLocation.getLongitude();
//            // long timestamp = userLocation.getTimestamp();
//            // System.out.println(user.getUsername() +" : "+ techLat + " / " + techLon + " timestamp:" + timestamp);
//            double dist = distance(clientLat, clientLon, techLat, techLon, "K");
//            peopleDistMap.put(user, dist);
//        }

        // sorting map
        ArrayList<User> sortedPeoplesList = new ArrayList<>();
        peopleDistMap.entrySet().stream()
                .sorted( (k1, k2) -> +k1.getValue().compareTo(k2.getValue()) )
                .forEach(k ->
                                sortedPeoplesList.add(k.getKey())
//                              System.out.println(k.getKey() + ": " + k.getValue())
                );

        for (int counter = 0; counter < sortedPeoplesList.size(); counter++) {
            if( counter > numOfPeople ) break;
            User people = sortedPeoplesList.get(counter);
            Double distance = peopleDistMap.get(people);
            nearestPeoplesMap.put(people, distance);
        }
        return nearestPeoplesMap;

    }





}
