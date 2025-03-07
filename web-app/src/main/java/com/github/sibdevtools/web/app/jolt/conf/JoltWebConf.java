package com.github.sibdevtools.web.app.jolt.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.VersionResourceResolver;

/**
 * @author sibmaks
 * @since 0.0.1
 */
@Configuration
@EnableWebMvc
@PropertySource("classpath:web/app/jolt/application.properties")
public class JoltWebConf implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/web/app/jolt/ui/**")
                .addResourceLocations("classpath:/web/app/jolt/static/")
                .resourceChain(true)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/web/app/jolt/ui/")
                .setViewName("forward:/web/app/jolt/ui/index.html");
    }
}
