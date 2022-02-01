package com.basic.app.acl.security.filter;

import com.basic.app.domain.system.VisitorsLog;
import com.basic.app.repository.system.VisitorsLogRepository;
import com.basic.app.util.core.ClientInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;


// https://fullstackdeveloper.guru/2020/07/13/how-to-log-ip-addresses-of-incoming-requests-to-a-spring-boot-app-in-a-centralized-way/

@Component
public class MyCustomInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private VisitorsLogRepository visitorsLogRepository;

    @Override
    public boolean preHandle(HttpServletRequest requestServlet, HttpServletResponse responseServlet, Object handler) throws Exception
    {
//        System.out.println("MINIMAL: INTERCEPTOR PREHANDLE CALLED");
//
//        ClientInfo clientInfo = new ClientInfo();
//        clientInfo.printClientInfo(requestServlet);

//        String ip = requestServlet.getRemoteAddr();
//        int port = requestServlet.getRemotePort();
//        StringBuffer url3 = requestServlet.getRequestURL();
//        String url = requestServlet.getRequestURI();

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception
    {
//        System.out.println("MINIMAL: INTERCEPTOR POSTHANDLE CALLED");

        String username = null;
        HttpSession httpSession = request.getSession();
        if(httpSession != null){
            if(httpSession.getAttribute("username") != null){
                username = httpSession.getAttribute("username").toString();
            }
        }

        ClientInfo clientInfo = new ClientInfo();
        clientInfo.printClientInfo(request);
        HashMap<String, String> clientInfoObj = clientInfo.getClientInfo(request);

        VisitorsLog visitorsLog = new VisitorsLog();
        visitorsLog.setUserId( username );
        visitorsLog.setIpAddress( clientInfoObj.get("clientIpAddr") );
        visitorsLog.setUserAgent( clientInfoObj.get("userAgent") );
        visitorsLog.setReferrer( clientInfoObj.get("referer") );
        visitorsLog.setVisitPage( clientInfoObj.get("fullURL") );
        visitorsLog.setVisitUrl( clientInfoObj.get("fullURL") );
        visitorsLog.setCreationDateTime( new Date() );
        visitorsLog.setCreationUser( username );

        //visitorsLogRepository.save(visitorsLog);

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception exception) throws Exception
    {
//        System.out.println("MINIMAL: INTERCEPTOR AFTERCOMPLETION CALLED");
    }



}
