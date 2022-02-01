package com.basic.app.controller.multimedia;

import com.basic.app.acl.auth.domain.User;
import com.basic.app.acl.auth.repository.UserRepository;
import com.basic.app.service.multimedia.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
@Controller
public class MultimediaController {

    @Autowired
    private StorageService storageService;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/uploadUserImage/user/{userId}", method = RequestMethod.GET)
    public String uploadUserImg(Model model, @PathVariable("userId") Long userId) {
        Optional<User> entityOptional = userRepository.findById(userId);
        if(entityOptional.isPresent()){
            User editEntity = entityOptional.get();
            model.addAttribute("userInst", editEntity);
        }
        return "view/multimedia/userimg/upload";
    }

    @RequestMapping(value = "/displayUserImage", method = RequestMethod.GET)
    public String displayUserImg(Model model) {
        return "view/multimedia/userimg/displayImgTest";
    }


    @RequestMapping(value = "/uploadProfilePic", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public String uploadProfilePic(@RequestParam MultipartFile file, HttpServletRequest request, RedirectAttributes redirAttr) {

        String userId = request.getParameter("userId");
        Optional<User> entityOptional = userRepository.findById(Long.parseLong(userId));

        if(entityOptional.isPresent()){
            User editEntity = entityOptional.get();

            String saveFileName = "123456789";
            String savePathFileName = "123456789";
            String fileName = file.getOriginalFilename();
            if(fileName != null){
                int index = fileName.lastIndexOf('.');
                if(index > 0) {
                    String extension = fileName.substring(index + 1);
                    extension = extension.toLowerCase();
                    saveFileName = editEntity.getPhoneNumber() + "_img." + extension;
                    savePathFileName = "/multimedia/profile-pic/" + saveFileName;
                }
            }

            // store file in disk
            storageService.uploadProfilePic(file, saveFileName);
            // save file path in db
            // editEntity.setProfilePicPath(savePathFileName);
            editEntity.setProfilePicPath2(savePathFileName);
            userRepository.save(editEntity);
        }

        return "redirect:/techuser/show/"+userId;
    }


    @RequestMapping(value = "/doUpload", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public String upload(@RequestParam MultipartFile file, RedirectAttributes redirAttr) {

        storageService.uploadFile(file);

        return "redirect:/userimg/upload";
    }




}
