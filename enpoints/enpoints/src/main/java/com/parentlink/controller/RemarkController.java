package com.parentlink.controller;

import com.parentlink.model.Remark;
import com.parentlink.service.ParticipateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/remarks")
public class RemarkController {

    @Autowired
    private ParticipateService participateService;

    // Obtener todos los remarks de un evento
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Remark>> getRemarksByEvent(@PathVariable Long eventId) {
        List<Remark> remarks = participateService.getRemarksByEvent(eventId);
        if (remarks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(remarks);
    }

    // Obtener todos los remarks de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Remark>> getRemarksByUser(@PathVariable Long userId) {
        List<Remark> remarks = participateService.getRemarksByUser(userId);
        if (remarks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(remarks);
    }
}
