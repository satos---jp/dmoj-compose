import random

class Problem:
	def __init__(self):
		self.id = "instructionless3"
		self.title = "Instructionless 3"
		self.desc = """
		## Sample Input 1
		
		    1 0 0
		
		
		## Sample Output 1
		
		    1
		
		
		## Sample Input 2
		
		    2 4 5
		
		
		## Sample Output 2
		
		    0
		
		
		## Sample Input 3
		
		    1 6 8
		
		
		## Sample Output 3
		
		    2
		
		
		"""
		
		st = random.getstate()
		random.seed(123)
		probs = []
		for i in range(10):
			a = random.randint(1,1000)
			b = random.randint(0,1000)
			c = random.randint(0,1000)
			if b**2-4*a*c==0:
				ans=1
			elif b**2-4*a*c>0:
				ans=2
			else:
				ans=0
			probs.append({'in': f'{a} {b} {c}', 'out': f'{ans}\n'})
		
		random.setstate(st)
		
		self.problems = probs
		
		
		