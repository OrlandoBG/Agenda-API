package io.github.OrlandoBG.agendaapi.model.repository;

import io.github.OrlandoBG.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}
