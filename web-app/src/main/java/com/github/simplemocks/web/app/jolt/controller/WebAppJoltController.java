package com.github.simplemocks.web.app.jolt.controller;

import com.bazaarvoice.jolt.Chainr;
import com.github.simplemocks.web.app.jolt.api.TransformRq;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author sibmaks
 * @since 0.0.1
 */
@RestController
@RequestMapping(
        path = "/web/app/jolt/",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class WebAppJoltController {
    @PostMapping(value = "/transform", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Object transform(@RequestBody TransformRq rq) {
        return Chainr.fromSpec(rq.specification())
                .transform(rq.input());
    }
}
