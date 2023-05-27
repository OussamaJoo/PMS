<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230321120009 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE typologie ADD etablissement_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE typologie ADD CONSTRAINT FK_166B84EDFF631228 FOREIGN KEY (etablissement_id) REFERENCES etablissement (id)');
        $this->addSql('CREATE INDEX IDX_166B84EDFF631228 ON typologie (etablissement_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE typologie DROP FOREIGN KEY FK_166B84EDFF631228');
        $this->addSql('DROP INDEX IDX_166B84EDFF631228 ON typologie');
        $this->addSql('ALTER TABLE typologie DROP etablissement_id');
    }
}
