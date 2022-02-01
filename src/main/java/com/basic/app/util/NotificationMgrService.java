package com.basic.app.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.UserRepository;
import com.basic.app.acl.auth.service.UserService;
import com.basic.app.domain.comn.Notification;
import com.basic.app.repository.comn.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// dynamic object map declaration in java
// and r&d links
// https://stackoverflow.com/questions/38393409/how-to-make-nested-hashmap-in-java

// http://zetcode.com/java/getpostrequest/
// https://dzone.com/articles/how-to-implement-get-and-post-request-through-simp
// https://mkyong.com/java/how-to-send-http-request-getpost-in-java/
// https://stackoverflow.com/questions/3324717/sending-http-post-request-in-java


@Service
public class NotificationMgrService {

    Boolean sysDebug = false;

    String apiUrl = "https://fcm.googleapis.com/fcm/send";
    String serverToken = "AAAA1XgEL_8:APA91bFTJGvdkO_E4y6uZKOVfkiU0U2r_YJKILrTUcP-gpU67T8kdZ4VP8U_m9nWyKwQUHd8XlTHOUsL00m13LeC-KJzmZTyKM3oR7sLstjWsQKdJFPSk80XldVKZ_Hul6VCNEoEMDPM";


    UserService userService;
    UserRepository userRepository;
    NotificationRepository repository;

    @Autowired
    public NotificationMgrService(NotificationRepository repository, UserService userService, UserRepository userRepository){
        this.repository = repository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public Map<String, Object> prepareMgsParams(Map<String, Object> params){

        Map<String, Object> mgsParams = new HashMap<>();
        mgsParams.put( "title", params.get("title") != null ? params.get("title") : "title12345" );
        mgsParams.put( "message", params.get("message") != null ? params.get("message") : "message12345" );
        mgsParams.put( "user", params.get("user") );
        mgsParams.put( "userType", params.get("userType") != null ? params.get("userType") : "" );
        mgsParams.put( "userName", params.get("userName") != null ? params.get("userName") : "" );
        mgsParams.put( "status", params.get("status") != null ? params.get("status") : 0 );
        mgsParams.put( "isPromotional", (params.get("isPromotional") != null) ? params.get("isPromotional") : false );
        mgsParams.put( "orderCode", (params.get("orderCode") != null) ? params.get("orderCode") : "W1245" );
        mgsParams.put( "timestamp", (params.get("timestamp") != null) ? params.get("timestamp") : new Date().getTime() );

        return mgsParams;
    }


    public Notification keepNotificationLog(Map<String, Object> params) throws Exception {

        String title = params.get("title").toString();
        String message = params.get("message").toString();
        User user = ( params.get("user") != null ) ? this.userService.findById( Long.parseLong(params.get("user").toString()) ): null;
        String userType = params.get("userType") != null ? params.get("userType").toString() : "";
        String userName = params.get("userName") != null ? params.get("userName").toString() : "";
        Integer status = params.get("status") != null ? (Integer) params.get("status") : null;
        Boolean isPromotional = params.get("isPromotional") != null ? (Boolean) params.get("isPromotional") : null;
        String orderCode = params.get("orderCode") != null ? params.get("orderCode").toString() : "";

        // validation
//        if(title == "" || title == null) return
//        if(message == "" || message == null) return

        Notification newNInst = new Notification();
        newNInst.setTitle(title);
        newNInst.setMessage(message);
        newNInst.setUser(user);
        newNInst.setUserType(userType);
        newNInst.setUserName(userName);
        newNInst.setStatus(status);
        newNInst.setPromotional(isPromotional);
        newNInst.setOrderCode(orderCode);
        newNInst.setTimestamp(new Date());

        System.out.println("Saving notification data .................. ");
        System.out.println(params);

        this.repository.save(newNInst);
        return newNInst;

    }



    public void sendNotification(Map<String, Object> params, String toToken) throws Exception {
        System.out.println(params);
        System.out.println(toToken);

        Map<String, Object> msgData;
        msgData = params;

        try {

            URL url = new URL(this.apiUrl);
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST"); // PUT is another valid option
            http.setDoOutput(true);
            // json
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "key="+this.serverToken);

            // prepare post data ---------------------------------------------------------------------------------------
//            def urlParameters = "name=Jack&occupation=programmer";
//            byte[] postData = urlParameters.getBytes(StandardCharsets.UTF_8)

            Map<String, Object> jsonObj = new HashMap<>();
            jsonObj.put("notification", new HashMap<String, Object>());
            jsonObj.put("priority", "high");
            jsonObj.put("data", msgData);
            jsonObj.put("to", toToken);

            Map<String,Object> elementMap = new HashMap<>();
            elementMap.put( "title", params.get("title") );
            elementMap.put( "body", params.get("message") );
            jsonObj.put("notification", elementMap);

            // def jsonObjStr = new JsonBuilder( jsonObj ).toPrettyString()
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonObjStr = ow.writeValueAsString( jsonObj );
            System.out.println(jsonObjStr);

            // write post data -----------------------------------------------------------------------------------------
            byte[] postData = jsonObjStr.getBytes(StandardCharsets.UTF_8);
            int length = postData.length;

            http.setFixedLengthStreamingMode(length);
            http.connect();

            DataOutputStream wr = new DataOutputStream(http.getOutputStream());
            wr.write(postData);

            // Read response -------------------------------------------------------------------------------------------
            StringBuilder content;
            BufferedReader br = new BufferedReader(new InputStreamReader(http.getInputStream()));

            String line;
            content = new StringBuilder();

            while ((line = br.readLine()) != null) {
                content.append(line);
                content.append(System.lineSeparator());
            }
            System.out.println(content.toString());

        } catch (Exception e){

            System.out.println(e.toString());

        }

        // keep log
        Notification notification = this.keepNotificationLog(params);
        if(this.sysDebug) System.out.println(notification);

    }





}
