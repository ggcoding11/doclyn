package com.example.doclyn_api.security;

import com.example.doclyn_api.services.TokenService;
import com.example.doclyn_api.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException {
        String token = recoverToken(request);

        //Para endpoints com permitAll() não darem problema!
        if (token != null) {
            String login = tokenService.validateToken(token);

            UserDetails user = userService.loadUserByUsername(login);

            var authentication = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    public String recoverToken(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            return null;
        }

        return authHeader.replace("Bearer ", "");
    }
}
