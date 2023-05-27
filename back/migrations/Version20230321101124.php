<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230321101124 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prix ADD typologie_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE prix ADD CONSTRAINT FK_F7EFEA5E42F4634A FOREIGN KEY (typologie_id) REFERENCES typologie (id)');
        $this->addSql('CREATE INDEX IDX_F7EFEA5E42F4634A ON prix (typologie_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prix DROP FOREIGN KEY FK_F7EFEA5E42F4634A');
        $this->addSql('DROP INDEX IDX_F7EFEA5E42F4634A ON prix');
        $this->addSql('ALTER TABLE prix DROP typologie_id');
    }
}
