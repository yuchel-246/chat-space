# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false, index: true|

### Association
- has_many :groups_users
- has_many :messages
  has_many :groups, through: :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|refernces|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
  has_many :users, through: :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|refernces|null: false, foreign_key: true|
|group_id|refernces|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
