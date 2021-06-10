<?php

namespace App\Form;

use App\Entity\Target;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TargetType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName')
            ->add('lastName')
            ->add('pseudo')
            ->add('email')
            ->add('age')
            ->add('sex', ChoiceType::class, [
                'choices' => [
                    'Homme' => 'Homme',
                    'Femme' => 'Femme',
                    'Ne souhaite pas repondre' => 'Ne souhaite pas répondre'
                ],
            ])
            ->add('familyComposition', ChoiceType::class, [
                'choices' => [
                    'Entre 1 et 2' => 'Entre 1 et 2',
                    'Entre 3 et 4' => 'Entre 3 et 4',
                    '4 et plus' => '4 et plus',
                    'Ne souhaite pas repondre' => 'Ne souhaite pas répondre'
                ],
            ])
            ->add('hobbies', ChoiceType::class, [
                'choices' => [
                    'Jeux-vidéos' => 'Jeux-vidéos',
                    'Film' => 'Film',
                    'Séries' => 'Séries',
                    'Musique' => 'Musique',
                    'Sports' => 'Sports',
                    'Ne souhaite pas repondre' => 'Ne souhaite pas répondre'
                ],
            ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Target::class,
        ]);
    }
}
