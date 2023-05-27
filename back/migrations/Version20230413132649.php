<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230413132649 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prix CHANGE date_prix date_prix DATE NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F7EFEA5ED73163AA42F4634A ON prix (date_prix, typologie_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_F7EFEA5ED73163AA42F4634A ON prix');
        $this->addSql('ALTER TABLE prix CHANGE date_prix date_prix DATETIME NOT NULL');
    }
}
