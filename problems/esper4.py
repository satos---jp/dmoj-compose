import random

class Problem:
	def __init__(self):
		self.id = "instructionless4"
		self.title = "Instructionless 4"
		self.desc = """
		## Sample Input 1
		
		    1 0 0
		
		
		## Sample Output 1
		
		    1
		
		
		## Sample Input 2
		
		    2 4 5
		
		
		## Sample Output 2
		
		    5
		
		
		## Sample Input 3
		
		    1 6 8
		
		
		## Sample Output 3
		
		    8
		
		
		"""
		
		st = random.getstate()
		random.seed(123)
		probs = []
		for i in range(10):
			a = random.randint(1,1000)
			b = random.randint(0,1000)
			c = random.randint(0,1000)
			probs.append({'in': f'{a} {b} {c}', 'out': f'{max(a,b,c)}\n'})
		
		random.setstate(st)
		
		self.problems = probs
		
		
		
