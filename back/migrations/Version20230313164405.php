<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230313164405 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE typologie DROP FOREIGN KEY FK_166B84ED2B9D6493');
        $this->addSql('DROP INDEX IDX_166B84ED2B9D6493 ON typologie');
        $this->addSql('ALTER TABLE typologie DROP disponibilite_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE typologie ADD disponibilite_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE typologie ADD CONSTRAINT FK_166B84ED2B9D6493 FOREIGN KEY (disponibilite_id) REFERENCES disponibilite (id)');
        $this->addSql('CREATE INDEX IDX_166B84ED2B9D6493 ON typologie (disponibilite_id)');
    }
}
