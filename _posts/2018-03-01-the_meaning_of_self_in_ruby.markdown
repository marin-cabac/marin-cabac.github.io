---
layout: post
title:      "The meaning of 'self' in Ruby"
date:       2018-03-01 14:52:31 -0500
permalink:  the_meaning_of_self_in_ruby
---


The idea for this post came from a conversation with one of my classmates at FLATIRON. Later I saw the same question asked on many different Ruby forums (as well as other programming  forums.) 

Self in Ruby is often considered  a very confusing subject. This is  because, well, it is a very confusing subject.
In my case  a huge obstacle in understanding certain subjects in programming is trying to decipher too much code at once. So often I find myself  taking somebody else's example and trying to simplify the code  by eliminating as many parts of it as possible while leaving just the part that I am trying to understand. This can turn, at times, into a  very painful and long process   So in a desperate attempt to shed some light on this infamous subject "The meaning of self in Ruby"  I will use a very basic examples and I will try to keep it as short as simple and as clear as possible, so please bear with me. 

First of all  what is self? "self" is a reserved keyword in Ruby.  For example "self" in Ruby is the same as "this" in Java.
"Self" refers to an object, the current object. However the meaning of  self even within the same portion of the code and sometimes for an unexperience programmer this sublte change can go unnoticed.

In my  example I am going to create a class named "Mother_ufo_ship" which is going to serve as 
a blueprint for creating "baby_ufo_ships" (which are instances of Mother_ufo_ship).  My goal is to be able to illustrate that the same keyword "self" can be used  to point to  different things. 

So I am going to use the keyword "self" twice: 

first time "self" will  point to the Mother_ufo_ship and 
the second time the same keyword "self" is going to point to the baby_ufo_ship. 

So again, "Self" is going to change it's meaning within the same piece of code. First it is going to an instance of the  class (which is a newly created  baby ship) and the second time it is going to point to the class itself (the mother ship)



```
######### P A R T I ######################### 

where "Self" is referring(pointing) to the class 
 
#########################################
```

```
>               class Mother_ufo_ship   
>   
>                  @@class_record_arr=[]
>   
>                     def initialize(baby_ship_name)
>     
>                            @name=baby_ship_name                             
>                            @@class_record_arr<<self     
>                            end 
>   
>     
>                 def show_record_method    
>                       @@class_record_arr     
>                 end 
>                 
>             end
```

`#########################################`

  ```
a_ship=Mother_ufo_ship.new("1st baby ship")
  b_ship=Mother_ufo_ship.new("2nd baby ship")  
	
  a_ship.show_record_method

```

` #########################################`

 
```
 def initialize(baby_ship_name) 

#Every baby ship receives  a name during                        
#the initialization process`
```


```

#########################################

Part 1 Explanation 

#########################################
```

```
> @@class_record_arr=[]    
>                          <--- Declaring an array that is going to serve 
>                          <--- as a record of all the baby ships created 
>                          <--- as instances So it is an array of objects.
>                          <--- The array is going to be held at the mother ship
>                          <--- @@ < indicates a class variable so it can be accessed by 
>                          <--- every instance of that class
```

def initialize(baby_ship_name) 
             #Every baby ship is going to receive a name during  
             # the initialization process
    
    @name=baby_ship_name       <--- the baby ship's name is getting assigned to an 
                               <--- instance variable @name
    @@class_record_arr<<self   <--- "self" here refers to the instance and not the class
                               <--- So everytime a baby ship is created "self" is going 
                               <--- to point to that baby ship and not the mother ship
                               <--- and a record of every instance  is going inside  
                               <--- our record array
    end 

`#########################################`
  

```
>   def show_record_method     
>                                                             
>     @@class_record_arr            
>     
>      end 



       #  this is an instance method that evey instance baby ship 
       #   will have and it this method allow to access a class variable
       #    that is held at the mother ship.   
```
			 
`#########################################`
```

> a_ship=Mother_ufo_ship.new("1st baby ship") 
> b_ship=Mother_ufo_ship.new("2nd baby ship")
```


	###  here we are creating 2 new baby ships and 
	###  giving assigning them a name
	###  Remember upon creation self points 
	###  to the newly created ship and gets
	###  appended to the record array 
	###  which is a class variable held at 
	###  the mother ship



```

> a_ship.show_record_method 

 ###calling the instance method that retrieves the 
 ###@@class_record_arr  
 ###class variable from
 ###the mother ship
```



>` Output for the above method call`

`#########################################`

```
a_ship.show_record_method       <-----calling the instance method 

=> [#<Mother_ufo_ship:0x005566c17b96e8 @name="1st baby ship">, #<Mother_ufo_ship:0x005566c17b9698 @name="2nd baby ship">]      

   #The output is an array 
   #of 2 instance objects held at the mother ship
```




 
```
#################################################

PART 2 where a second "self" refers to the Class not the instance

#################################################
```

```

>          def self.show_record_method       
>                                                                     
>                @@class_record_arr          
>                                                                     
>          end                                   

#By adding "self"  to our method above, we are telling the class 
#that  #show_record_method is not an instance method anymore
#but it is a class method. The output is an error that indicates that our instance doesn't
#have this method. Because of "self" it became a class method. See the error below
```


----------------------ERROR------------------------------
```
> undefined method `show_record_method' for #<Mother_ufo_ship:0x00556fde60d698 @name="1st baby ship">
> (repl):23:in `<main>'
```

--------------------------------------------------------

So once you use add "self" to the method  the baby ships can't use the method any more
because only the mother ship class has it.

So we can access this method by calling the class directly 

```
> Mother_ufo_ship.show_record_method   

   ### mother ship calling it's own method                                                                                      
	### baby ships don't have the method any longer
```
																		 
```
#############################################
>  -the output same as before an array record of baby ships
 


> => [#<Mother_ufo_ship:0x00561bd1f11768 @name="1st baby ship">, #<Mother_ufo_ship:0x00561bd1f11718 @name="2nd baby ship">]

##########################################################
```

So I guess like the romans used to say "Quod Erat Demonstrandum" 

The keyword "self" in the code below is used twice pointing at two different things

```
-------------------------------------------------------
>    class Mother_ufo_ship  
>   
>          @@class_record_arr=[]
>   
>           def initialize(baby_ship_name)
>           
>           @name=baby_ship_name
>           @@class_record_arr<<self               # here self points to "itself the instance"
>                                   
>           end                     
>      
>            
>              def self.show_record_method        # here self points to "itself the class"
>              
>                @@class_record_arr 
>          
>          end 
>    
>    end 
> 
-------------------------------------------------------
```


I am sure I have made some mistakes (the explanation turned out way longer then my 
little brain is used to) So please feel free to correct me.  Namaste!


