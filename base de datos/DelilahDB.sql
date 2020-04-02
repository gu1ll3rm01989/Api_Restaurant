-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah` DEFAULT CHARACTER SET utf8 ;
USE `delilah` ;

-- -----------------------------------------------------
-- Table `delilah`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`rol` (
  `rol_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rol_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rol_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`user` (
  `user_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_fullname` VARCHAR(255) NOT NULL,
  `user_mail` VARCHAR(255) NOT NULL,
  `user_phone` INT(11) NOT NULL,
  `user_address` TEXT NOT NULL,
  `user_user` VARCHAR(255) NOT NULL,
  `login_login_id` BIGINT(20) UNSIGNED NOT NULL,
  `rol_rol_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_mail_UNIQUE` (`user_mail` ASC) ,
  UNIQUE INDEX `user_user_UNIQUE` (`user_user` ASC) ,
  INDEX `fk_user_rol1_idx` (`rol_rol_id` ASC) ,
  CONSTRAINT `fk_user_rol1`
    FOREIGN KEY (`rol_rol_id`)
    REFERENCES `delilah`.`rol` (`rol_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`login` (
  `login_pass` VARCHAR(255) NOT NULL,
  `login_token` VARCHAR(255) NOT NULL,
  `user_user_id` INT(10) UNSIGNED NOT NULL,
  INDEX `fk_login_user1_idx` (`user_user_id` ASC) ,
  CONSTRAINT `fk_login_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `delilah`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`payment` (
  `payment_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `payment_method` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`payment_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`state` (
  `state_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `state_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`state_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`order` (
  `order_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_hour` TIME NOT NULL,
  `order_total` FLOAT NOT NULL,
  `state_state_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_user_id` INT(10) UNSIGNED NOT NULL,
  `payment_payment_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_order_state1_idx` (`state_state_id` ASC) ,
  INDEX `fk_order_user1_idx` (`user_user_id` ASC) ,
  INDEX `fk_order_payment1_idx` (`payment_payment_id` ASC) ,
  CONSTRAINT `fk_order_payment1`
    FOREIGN KEY (`payment_payment_id`)
    REFERENCES `delilah`.`payment` (`payment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_state1`
    FOREIGN KEY (`state_state_id`)
    REFERENCES `delilah`.`state` (`state_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `delilah`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`product` (
  `product_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `product_price` FLOAT NOT NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`favorite` (
  `favorite_product_id` BIGINT(20) UNSIGNED NOT NULL,
  `favorite_user_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`favorite_product_id`, `favorite_user_id`),
  INDEX `fk_product_has_user_user1_idx` (`favorite_user_id` ASC) ,
  INDEX `fk_product_has_user_product1_idx` (`favorite_product_id` ASC) ,
  CONSTRAINT `fk_product_has_user_product1`
    FOREIGN KEY (`favorite_product_id`)
    REFERENCES `delilah`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_user_user1`
    FOREIGN KEY (`favorite_user_id`)
    REFERENCES `delilah`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`detail_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`detail_order` (
  `detail_order_product_id` BIGINT(20) UNSIGNED NOT NULL,
  `detail_order_order_id` INT(10) UNSIGNED NOT NULL,
  `detail_order_subtotal` FLOAT NOT NULL,
  `detail_order_quantity` INT NOT NULL,
  PRIMARY KEY (`detail_order_product_id`, `detail_order_order_id`),
  INDEX `fk_product_has_order_order1_idx` (`detail_order_order_id` ASC) ,
  INDEX `fk_product_has_order_product1_idx` (`detail_order_product_id` ASC) ,
  CONSTRAINT `fk_product_has_order_product1`
    FOREIGN KEY (`detail_order_product_id`)
    REFERENCES `delilah`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_order_order1`
    FOREIGN KEY (`detail_order_order_id`)
    REFERENCES `delilah`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
