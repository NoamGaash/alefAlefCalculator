
			var values = [];// מערך שמכיל בכל תא מערך עם 2 תאים, תא ראשון כרגע ריק, תא שני מקבל את נמחיר של המוצר בלולאה הבאה
			
            // מבקש מהשרת את המידע על החנות
            $.get("products.json", function(products) {
                products.shop.forEach(function(item, index) {
				
					values.push([0,parseInt(item.price)]);// כאן אני מוסיף את המערך של 2 התאים לתוך המערך הכללי, תא ראשון כרגע ב0 תא שני מקבל את המחיר
                
					var product =
                        $("<div>") // עוטף את הלייבל ואת האינפוט
                            .addClass("form-group")
                            .append(
                                $("<label style='float:right;'>")
                                .attr("for", "product"+index)
                                .html(item.name + " במחיר " + item.price + ": ")
								.addClass("control-label col-sm-2")// הוספתי קלאס של 2 עמודות
                            )
                            .append(
								$("<div>")
								.addClass("col-sm-10")//  הוספתי דיב עוטף נוסף לאינפוט בכדי להגדיר לו 10 עמודות
								.append(
									$("<input type=\"number\">")
									.attr("id", "product"+index)
									.attr("name", "product"+index)
									.attr("data-price", item.price)
									.val(0)
									.addClass("form-control")
									.keyup(function(){// הוספתי אירוע לחישוב מחיר סל הקניות
										values[index][0] =  $(this).val();// אני מכניס את הכמות שבאינפוט לתא הראשון במערך של 2 התאים לפי האינקדס הספיציפי
										setTotal();// קורא לפונקציה שעושה את החישוב של כל הרהיטים כפול המחיר שלהם
									})
									.change(function(){// הוספתי אירוע לחישוב מחיר סל הקניות
										values[index][0] =  $(this).val();// אני מכניס את הכמות שבאינפוט לתא הראשון במערך של 2 התאים לפי האינקדס הספיציפי
										setTotal();// קורא לפונקציה שעושה את החישוב של כל הרהיטים כפול המחיר שלהם
									})
								)
                            );
                    $("form").append(product);
                });
				
				// אין הרבה מה להסביר... לולאה פוראיצ' שמוסיפה למסך לחצני מטבעות לפי כמות האובייקטים שבג'סון
				products.rates.forEach(function(item, index) {
					var label = $("<label>")
								.append(
									$("<input type='radio'>")
									.attr("name" , "currency")
									.val(item.currency)
									.change(function(){setTotal()})// אירוע בעת שינוי שוב קריאה לפונקציה המסכמת
									)
								.append(
									$("<span>")
									.html(item.currency)
									.append($("<img>")
										.attr("src", item.img)
									)
								)
					 $(".currencies").append(label);
				});

				$("input[type=radio]:first").attr("checked" , true);// הגדרה של המטבע הראשון כנבחר
				
				var gates = products.rates; // מקבל את כל המטבעות למערך
				
				function setTotal(){// הפונקציה המסכמת
					var totalPrice = 0;
					for(var i=0; i<values.length; i++){// לולאה שעוברת על כל המערך ובכל תא יש מערך בין שני תאים, מכפילה את התא הראשון שהוא הכמות בתא השני שהוא המחיר
						totalPrice += values[i][0] * values[i][1];
					}
					
					var coinName = $("input[type=radio]:checked").val();// מקבל את סוג המטבע הנבחר
					
					for(var i=0; i<gates.length; i++){
						if(coinName == gates[i].currency){// מחפש במערך את האובייקט עם השם של המטבע
							totalPrice = parseInt(totalPrice*gates[i].rate);// מכפיל את המחיר במטבע הקיים
						}
					}
					$("#totalPrice").html(totalPrice + " " + coinName); // מציג את הנתונים בכל שינוי
				}
            })
