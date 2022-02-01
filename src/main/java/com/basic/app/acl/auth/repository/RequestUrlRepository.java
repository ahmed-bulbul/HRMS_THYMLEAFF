package com.basic.app.acl.auth.repository;

import com.basic.app.acl.auth.domain.RequestUrl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RequestUrlRepository extends JpaRepository<RequestUrl, Long> {

    Optional<RequestUrl> getByUrl(String url);

//    RequestUrl getByUrl(String url, Boolean menuGenerate);

//    @Query("select * from RequestUrl c where c.url = :url")
//    RequestUrl getByUrlPath(@Param("url") String url);



    @Query("SELECT e FROM RequestUrl e WHERE e.url = ?1")
    RequestUrl getByUrlPath(String url);


}
