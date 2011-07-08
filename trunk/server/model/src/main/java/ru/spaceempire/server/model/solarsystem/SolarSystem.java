package ru.spaceempire.server.model.solarsystem;

import org.hibernate.annotations.ForeignKey;
import ru.spaceempire.server.model.BaseEntity;
import ru.spaceempire.server.model.galaxy.GalaxySector;

import javax.persistence.*;

/**
 * User: Sergey
 * Date: 13.06.11 20:50
 */
@Entity
@Table(name = "solar_system")
@javax.persistence.SequenceGenerator(
        name = "id_generator",
        sequenceName = "solar_system_seq"
)
public class SolarSystem extends BaseEntity {
    @Column
    private String name;
    @Column
    private Integer height;
    @Column
    private Integer wight;

    @ManyToOne()
    @JoinColumn(name = "galaxy_sector_id")
    @ForeignKey(name = "fk_solar_system2galaxy_sector")
    private GalaxySector galaxySector;

    public SolarSystem() {
    }

    public GalaxySector getGalaxySector() {
        return galaxySector;
    }

    public void setGalaxySector(GalaxySector galaxySector) {
        this.galaxySector = galaxySector;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWight() {
        return wight;
    }

    public void setWight(Integer wight) {
        this.wight = wight;
    }
}
