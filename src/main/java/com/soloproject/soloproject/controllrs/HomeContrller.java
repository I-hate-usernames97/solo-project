package com.soloproject.soloproject.controllrs;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeContrller {

    @GetMapping("")
    private String home(){
        return "index";
    }
}
