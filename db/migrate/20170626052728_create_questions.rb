class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    change_table :questions do |t|
      t.string :title
      t.text :contents

      t.timestamps
    end
  end
end