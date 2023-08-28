package com.soloproject.soloproject.data;


import com.soloproject.soloproject.controllrs.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

    User findByEmail(String email);

}