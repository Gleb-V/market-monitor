<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250824163054 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE exchanges_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE assets_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE markets_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE candles_id_seq CASCADE');
        $this->addSql('CREATE TABLE product (id INT NOT NULL, name VARCHAR(255) NOT NULL, price DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE candles DROP CONSTRAINT candles_exchange_id_fkey');
        $this->addSql('ALTER TABLE candles DROP CONSTRAINT candles_market_id_fkey');
        $this->addSql('ALTER TABLE markets DROP CONSTRAINT markets_base_asset_id_fkey');
        $this->addSql('ALTER TABLE markets DROP CONSTRAINT markets_exchange_id_fkey');
        $this->addSql('ALTER TABLE markets DROP CONSTRAINT markets_quote_asset_id_fkey');
        $this->addSql('DROP TABLE assets');
        $this->addSql('DROP TABLE candles');
        $this->addSql('DROP TABLE exchanges');
        $this->addSql('DROP TABLE markets');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE exchanges_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE assets_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE markets_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE candles_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE assets (id SERIAL NOT NULL, code TEXT NOT NULL, name TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX assets_code_key ON assets (code)');
        $this->addSql('CREATE TABLE candles (id BIGSERIAL NOT NULL, exchange_id INT NOT NULL, market_id INT NOT NULL, "interval" TEXT NOT NULL, open_time TIMESTAMP(0) WITH TIME ZONE NOT NULL, open NUMERIC(20, 10) NOT NULL, high NUMERIC(20, 10) NOT NULL, low NUMERIC(20, 10) NOT NULL, close NUMERIC(20, 10) NOT NULL, volume NUMERIC(30, 10) NOT NULL, closed BOOLEAN DEFAULT true NOT NULL, received_at TIMESTAMP(0) WITH TIME ZONE DEFAULT \'now()\' NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX candles_exchange_id_market_id_interval_open_time_key ON candles (exchange_id, market_id, "interval", open_time)');
        $this->addSql('CREATE INDEX candles_idx_lookup ON candles (exchange_id, market_id, "interval", open_time)');
        $this->addSql('CREATE INDEX IDX_E69771A168AFD1A0 ON candles (exchange_id)');
        $this->addSql('CREATE INDEX IDX_E69771A1622F3F37 ON candles (market_id)');
        $this->addSql('CREATE TABLE exchanges (id SERIAL NOT NULL, code TEXT NOT NULL, name TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX exchanges_code_key ON exchanges (code)');
        $this->addSql('CREATE TABLE markets (id SERIAL NOT NULL, exchange_id INT NOT NULL, base_asset_id INT NOT NULL, quote_asset_id INT NOT NULL, symbol_native TEXT NOT NULL, status TEXT DEFAULT \'active\' NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX markets_exchange_id_base_asset_id_quote_asset_id_key ON markets (exchange_id, base_asset_id, quote_asset_id)');
        $this->addSql('CREATE UNIQUE INDEX markets_exchange_id_symbol_native_key ON markets (exchange_id, symbol_native)');
        $this->addSql('CREATE INDEX IDX_17D378B64F31BAB9 ON markets (base_asset_id)');
        $this->addSql('CREATE INDEX IDX_17D378B668AFD1A0 ON markets (exchange_id)');
        $this->addSql('CREATE INDEX IDX_17D378B6EFE0B1D0 ON markets (quote_asset_id)');
        $this->addSql('ALTER TABLE candles ADD CONSTRAINT candles_exchange_id_fkey FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE candles ADD CONSTRAINT candles_market_id_fkey FOREIGN KEY (market_id) REFERENCES markets (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE markets ADD CONSTRAINT markets_base_asset_id_fkey FOREIGN KEY (base_asset_id) REFERENCES assets (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE markets ADD CONSTRAINT markets_exchange_id_fkey FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE markets ADD CONSTRAINT markets_quote_asset_id_fkey FOREIGN KEY (quote_asset_id) REFERENCES assets (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE product');
    }
}
