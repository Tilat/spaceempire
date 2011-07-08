package ru.spaceempire.server.model.galaxy;

import ru.spaceempire.server.model.BaseEntity;
import ru.spaceempire.server.model.solarsystem.SolarSystem;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * User: Sergey
 * Date: 13.06.11 20:56
 */
@Entity
@Table(name = "galaxy_sector")
@javax.persistence.SequenceGenerator(
        name = "id_generator",
        sequenceName = "galaxy_sector_seq"
)
public class GalaxySector extends BaseEntity {
    @Column
    private Long sectorA;
    @Column
    private Long sectorB;
    @Column
    private Long sectorC;
    @Column
    private Long sectorD;
    @Column
    private Integer height;
    @Column
    private Integer wight;


    @OneToMany(mappedBy = "galaxySector", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private Set<SolarSystem> solarSystems = new HashSet<SolarSystem>();

    public Set<SolarSystem> getSolarSystems() {
        return solarSystems;
    }

    public void setSolarSystems(Set<SolarSystem> solarSystems) {
        this.solarSystems = solarSystems;
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

    public GalaxySector() {
    }

    public Long getSectorA() {
        return sectorA;
    }

    public void setSectorA(Long sectorA) {
        this.sectorA = sectorA;
    }

    public Long getSectorB() {
        return sectorB;
    }

    public void setSectorB(Long sectorB) {
        this.sectorB = sectorB;
    }

    public Long getSectorC() {
        return sectorC;
    }

    public void setSectorC(Long sectorC) {
        this.sectorC = sectorC;
    }

    public Long getSectorD() {
        return sectorD;
    }

    public void setSectorD(Long sectorD) {
        this.sectorD = sectorD;
    }
}
