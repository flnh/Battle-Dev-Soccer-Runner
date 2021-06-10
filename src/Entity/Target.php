<?php

namespace App\Entity;

use App\Repository\TargetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TargetRepository::class)
 */
class Target
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pseudo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="integer")
     */
    private $age;

    const SEX = ['Homme', 'Femme', 'Ne souhaite pas répondre'];
    /**
     * @ORM\Column(type="string", columnDefinition="enum('Homme', 'Femme', 'Ne souhaite pas répondre')")
     */
    private $sex;

    const FAMILYCOMPOSITION = ['Entre 1 et 2', 'Entre 3 et 4', '4 et plus' ,'Ne souhaite pas répondre'];
    /**
     * @ORM\Column(type="string", columnDefinition="enum('Entre 1 et 2', 'Entre 3 et 4', '4 et plus' ,'Ne souhaite pas répondre')")
     */
    private $familyComposition;

    const HOBBIES = ['Jeux-vidéos', 'Film', 'Séries', 'Musique', 'Sports' ,'Ne souhaite pas répondre'];
    /**
     * @ORM\Column(type="string", columnDefinition="enum('Jeux-vidéos', 'Film', 'Séries', 'Musique', 'Sports' ,'Ne souhaite pas répondre')")
     */
    private $hobbies;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $token;

    /**
     * @ORM\OneToMany(targetEntity=Score::class, mappedBy="target")
     */
    private $scores;

    public function __construct()
    {
        $this->scores = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getSex(): ?string
    {
        return $this->sex;
    }

    public function setSex(string $sex): self
    {
        if (!in_array($sex, self::SEX)) {
            throw new \InvalidArgumentException("Invalid sex");
        }
        $this->sex = $sex;
        return $this;
    }

    public function getFamilyComposition(): ?string
    {
        return $this->familyComposition;
    }

    public function setFamilyComposition(string $familyComposition): self
    {
        if (!in_array($familyComposition, self::FAMILYCOMPOSITION)) {
            throw new \InvalidArgumentException("Invalid familyComposition");
        }
        $this->familyComposition = $familyComposition;

        return $this;
    }

    public function getHobbies(): ?string
    {
        return $this->hobbies;
    }

    public function setHobbies(string $hobbies): self
    {
        if (!in_array($hobbies, self::HOBBIES)) {
            throw new \InvalidArgumentException("Invalid hobbies");
        }

        $this->hobbies = $hobbies;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @return Collection|Score[]
     */
    public function getScores(): Collection
    {
        return $this->scores;
    }

    public function addScore(Score $score): self
    {
        if (!$this->scores->contains($score)) {
            $this->scores[] = $score;
            $score->setTarget($this);
        }

        return $this;
    }

    public function removeScore(Score $score): self
    {
        if ($this->scores->removeElement($score)) {
            // set the owning side to null (unless already changed)
            if ($score->getTarget() === $this) {
                $score->setTarget(null);
            }
        }

        return $this;
    }
}
