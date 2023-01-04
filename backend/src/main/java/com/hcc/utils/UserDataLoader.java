package com.hcc.utils;

import com.hcc.entities.Authority;
import com.hcc.entities.User;
import com.hcc.repositories.AuthorityRepository;
import com.hcc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;

@Component
public class UserDataLoader implements CommandLineRunner {

    @Autowired
    UserRepository userRepo;

    @Autowired
    AuthorityRepository authRepo;
    @Override
    public void run(String... args) throws Exception {
        loadUserData();
        loadAuthorityData();

    }

    private void loadUserData() {
        if (userRepo.count() == 1) {
            PasswordEncoder pwenc = new BCryptPasswordEncoder();
            String pw = pwenc.encode("asdfasdf");
            User tom2 = new User(LocalDate.now(), "tom2", pw);
            userRepo.save(tom2);
        }
    }

    private void loadAuthorityData() {
        if (authRepo.count() == 1) {
            Authority adm = new Authority("ROLE_ADMIN", userRepo.findByUsername("tom2").get());
            authRepo.save(adm);
        }
    }
}
