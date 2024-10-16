package com.github.sibdevtools.web.app.jolt.controller;

import com.bazaarvoice.jolt.Chainr;
import com.github.sibdevtools.common.api.rs.StandardBodyRs;
import com.github.sibdevtools.web.app.jolt.api.TransformRq;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;

/**
 * @author sibmaks
 * @since 0.0.1
 */
@RestController
@RequestMapping(
        path = "/web/app/jolt/rest/api/",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class WebAppJoltController {
    @PostMapping(path = "/v1/transform", consumes = MediaType.APPLICATION_JSON_VALUE)
    public StandardBodyRs<Serializable> transform(@RequestBody TransformRq rq) {
        var specification = rq.specification();
        var input = rq.input();
        if (specification == null || specification.isEmpty()) {
            return new StandardBodyRs<>(input);
        }
        var output = Chainr.fromSpec(specification)
                .transform(input);
        return new StandardBodyRs<>((Serializable) output);
    }
}
