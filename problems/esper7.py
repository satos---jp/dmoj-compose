import random
import hashlib

class Problem:
	def __init__(self):
		self.id = "instructionless7"
		self.title = "Instructionless 7"
		self.desc = """
		## Sample Input 1
		
		    12345
		
		
		## Sample Output 1
		
		    827ccb0eea8a706c4c34a16891f84e7b
		
		
		## Sample Input 2
		
		    sample
		
		
		## Sample Output 2
		
		    5e8ff9bf55ba3508199d22e984129be6
		
		
		## Sample Input 3
		
		    somerandomstring		
		
		## Sample Output 3
		
		    64d630c8960212f7f50ebef9eb27ba22
		"""
		
		st = random.getstate()
		random.seed(123)
		probs = []
		for i in range(10):
			s = str(random.randint(1,10000))
			t = hashlib.md5(s.encode('ascii')).digest().hex()
			
			probs.append({'in': f'{s}\n', 'out': f'{t}\n'})
		
		random.setstate(st)

		self.problems = probs
		
		self.langs = ["procon"]
		
		
		
