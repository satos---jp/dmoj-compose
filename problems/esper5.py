import random

class Problem:
	def __init__(self):
		self.id = "instructionless5"
		self.title = "Instructionless 5"
		self.desc = """
		## Sample Input 1
		
		    5
			1 4 5 12 3
		
		
		## Sample Output 1
		
		    25
		
		
		## Sample Input 2
		
		    2
			17 13
		
		
		## Sample Output 2
		
		    30
		
		
		## Sample Input 3
		
		    10
			3 6 1 4 3 5 8 6 7 10
		
		
		## Sample Output 3
		
		    53
		
		
		"""
		
		st = random.getstate()
		random.seed(123)
		probs = []
		for i in range(10):
			n=random.randint(1,50)
			l=[]
			for j in range(n):
				l.append(j)
			
			probs.append({'in': f'{n}\n{" ".join(map(str,l))}', 'out': f'{sum(l)}\n'})
		
		random.setstate(st)
		
		self.problems = probs
		
		
		
