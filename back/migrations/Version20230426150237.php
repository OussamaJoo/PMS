<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230426150237 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD meal_plan_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955912AB082 FOREIGN KEY (meal_plan_id) REFERENCES meal_plan (id)');
        $this->addSql('CREATE INDEX IDX_42C84955912AB082 ON reservation (meal_plan_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955912AB082');
        $this->addSql('DROP INDEX IDX_42C84955912AB082 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP meal_plan_id');
    }
}
